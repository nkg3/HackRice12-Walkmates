const functions = require("firebase-functions");

const admin = require("firebase-admin");
const serviceAccount = require("./hackrice12-walkshare-firebase-adminsdk-3aioe-8b2d7252e5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const requests = {
    request1: {
        rid: '1', //request id
        uuid: "1000", //user's uuid
        endLoc: [29.705831295205563, -95.4047669771351],
        startLoc: [29.71821312032989, -95.40018295661717],
        startTime: 24.75,
        endTime: 25
    },
    request2: {
        rid: "2",
        uuid: "2000",
        endLoc: [29.707831295205563, -95.4047669771351],
        startLoc: [29.71821312032989, -95.40018295661717],
        startTime: 23.1,
        endTime: 24
    },
    request3: {
        rid: "3",
        uuid: "3000",
        endLoc: [29.705831295205563, -95.4047669771351],
        startLoc: [29.71821312032989, -95.40018295661717],
        startTime: 23,
        endTime: 23.75
    },
    request4: {
        rid: "4",
        uuid: "4000",
        endLoc: [29.705831295205563, -95.4047669771351],
        startLoc: [29.71821312032989, -95.40018295661717],
        startTime: 23.5,
        endTime: 25.25
    },
    request5: {
        rid: "5",
        uuid: "5000",
        endLoc: [29.705831295205563, -95.4047669771351],
        startLoc: [29.71821312032989, -95.40018295661717],
        startTime: 24,
        endTime: 25
    },
    request6: {
        rid: "6",
        uuid: "6000",
        endLoc: [29.705831295205563, -95.4047669771351],
        startLoc: [29.71821312032989, -95.40018295661717],
        startTime: 23.5,
        endTime: 25
    },
}

exports.validateLocation = functions.firestore
    .document('users/{userId}')
    .onUpdate((change, context) => {
        const newValue = change.after.data();
        const oldValue = change.before.data();

        if (newValue.location == oldValue.location) {
            return;
        }

    });


exports.findGroup = functions.https.onCall(async (data, context) => {
    const groups = {};
    const groupsArray = await getGroups();
    groupsArray.forEach(group => {
        groups[group.number] = group;
    })
    await addToGroups(data.request, groups);
    await writeGroups(groups);
});



const writeGroups = async(groups) => {
    var batch = admin.firestore().batch();
    var groupsRef = admin.firestore().collection('groups');
    for(const group in groups) {
        var groupRef = groupsRef.doc(group);
        groupRef.set(groups[group]);
    }
    await batch.commit();
}

function dist (pair1, pair2){
    return Math.sqrt((pair1[0] - pair2[0])*(pair1[0] - pair2[0]) + (pair1[1] - pair2[1])*(pair1[1] - pair2[1]))
}

const getGroups = async () => {
    const snapshot = await admin.firestore().collection("groups").get();
    return snapshot.docs.map((doc) => doc.data());
}

function getUser(uuid, users){
    for (const user in users){
        if (users[user].uuid == uuid){
            return user
        }
    }
    return "no user found"
}

const getUsers = async () => {
    let users = {};
    const snapshot = await admin.firestore().collection("users").get();
    return snapshot.docs.map((doc) => doc.data());
}

function matchRequestCheck (request, groups, users){
    //takes in a request, returns the group id of the smallest group if one exists, -1 if no group exists.
    goodGroups = []
    userCur = getUser(request.uuid, users)
    for (const group in groups){
        if ((!(groups[group].timeOverlap.startTime >= request.endTime || groups[group].timeOverlap.endTime <= request.startTime)) //timing
            && ((dist(request.startLoc, groups[group].startLoc) < 0.002) && (dist(request.endLoc, groups[group].endLoc) < 0.002)) //location
            && ((users[userCur].genderfilter == false) || (((users[userCur].female == true)&&(groups[group].female == true)) || ((users[userCur].male == true)&&(groups[group].male == true))  )) //gender
            && (!(    groups[group].number == 1 && users[getUser(groups[group].requests[Object.keys(groups[group].requests)[0]].uuid, users)].genderfilter == true && (groups[group].male == users[userCur].female) )) //backtesting
        ){
            goodGroups.push([groups[group].groupID,groups[group].number])
        }
    }
    if (goodGroups.length == 0){
        return -1
    }
    smallest = 100
    bestindex = -1
    for (const gpindex in goodGroups){
        if (goodGroups[gpindex][1] < smallest){
            smallest = goodGroups[gpindex][1]
            bestindex = goodGroups[gpindex][0]
        }
    }
    return bestindex
}
function makeNewGroup(request, groups, users){
    if (Object.keys(groups).length == 0){
        gpid = 1
    } else{
        nonoGroups = []
        for (const group in groups){
            nonoGroups.push(groups[group].groupID)
        }
        gpid = Math.max.apply(null, nonoGroups) + 1
    }
    startTime = request.startLoc
    endTime = request.endLoc

    const toAdd = {
        groupID: gpid,
        number: 1,
        endLoc: endTime,
        startLoc: startTime,
        requests: {
            ["request" +  request.uuid] : request
        },
        timeOverlap: {
            startTime: request.startTime,
            endTime: request.endTime
        },
        male: users[getUser(request.uuid, users)].male,
        female: users[getUser(request.uuid, users)].female
    }
    return toAdd

}
function groupMod(request, groupNum, groups, users){
    for (const group in groups){
        if (groups[group].groupID == groupNum){
            groups[group].number += 1
            groups[group].requests[ ["request" +  request.uuid]] = request
            groups[group].timeOverlap.startTime = Math.max(groups[group].timeOverlap.startTime, request.startTime)
            groups[group].timeOverlap.endTime = Math.min(groups[group].timeOverlap.endTime, request.endTime)
            if (users[getUser(request.uuid, users)].male == true){
                groups[group].male = true
            } else{
                groups[group].female = true
            }
            break
        }
    }
}
async function addToGroups(request, groups){
    const users = {};
    const usersArray = await getUsers();
    usersArray.forEach(user => {
        users[user.uuid] = user;
    })
    bestGroupForYou = matchRequestCheck(request, groups, users)
    if (bestGroupForYou == -1){
        if (Object.keys(groups).length == 0){
            gpName = "group1"
        } else{
            nonoGroups = []
            for (const group in groups){
                nonoGroups.push(groups[group].groupID)
            }
            gpName = "group" + (Math.max.apply(null, nonoGroups) + 1).toString()
        }
        groups[gpName] = makeNewGroup(request, groups, users)
    }else{
        groupMod(request, bestGroupForYou, groups, users)
    }
}

const testing = async () => {
    const groups = {};
    const groupsArray = await getGroups();
    groupsArray.forEach(group => {
        groups[group.number] = group;
    })
    // for(const request in requests) {
    //     await addToGroups(request, groups);
    // }
    await addToGroups(requests.request1, groups);
    await addToGroups(requests.request2, groups);
    await addToGroups(requests.request3, groups);
    await addToGroups(requests.request4, groups);
    await addToGroups(requests.request5, groups);
    await addToGroups(requests.request6, groups);
    await writeGroups(groups);
}

testing().then(() => {
    console.log("Done?");
});

// exports.sendSMS = functions.https.onRequest((req, res) => {
//     const accountSid = 'AC82e71085c531bfa7d662aa0f1ee788b5';
//     const authToken = '3fec792d1887bb46c16ea1d5ac39e697';
//     const client = require('twilio')(accountSid, authToken);

//     client.messages
//     .create({
//         body: 'waaa',
//         from: '+15017122661',
//         to: '+13019198375'
//     })
//     .then(message => console.log(message.sid));
// });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
