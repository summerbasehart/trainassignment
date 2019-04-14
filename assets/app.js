var config = {
    apiKey: "AIzaSyA465YF5wqxt52stkFaWdjHxtpHXkxYd80",
    authDomain: "trainassignment-18cad.firebaseapp.com",
    databaseURL: "https://trainassignment-18cad.firebaseio.com",
    projectId: "trainassignment-18cad",
    storageBucket: "",
    messagingSenderId: "131106889049"
};
firebase.initializeApp(config);

var db = firebase.firestore()

var trainName = "";
var destination = "";
var firstTrain = 0;
var frequency = 0;
var currentTime = moment()

document.querySelector('#submit').addEventListener('click', e => {
    e.preventDefault()
    let id = db.collection('trains').doc().id
    db.collection('trains').doc(id).set({
        trainName: document.querySelector('#trainName').value,
        destination: document.querySelector('#destination').value,
        departure: document.querySelector('#departure').value,
        frequency: document.querySelector('#frequency').value,
    })
    document.querySelector('#trainName').value = ''
    document.querySelector('#destination').value = ''
    document.querySelector('#departure').value = ''
    document.querySelector('#frequency').value = ''
})

var firstTimeConverted = moment(departure, "hh:mm");
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
var tRemainder = diffTime % Frequency;
var tMinutesTillTrain = Frequency - tRemainder;

var nextTrain = moment().add(tMinutesTillTrain, "minutes");
var trainArrival = moment(nextTrain).format("hh:mm");

db.collection('trains').onSnapshot(({ docs }) => {
    document.querySelector('#trainInput').innerHTML = ''
    docs.forEach(doc => {
        let { trainName, destination, departure, trainArrival } = doc.data()
        let docElem = document.createElement('div')
        docElem.innerHTML =
            `
         <h3>${trainName}</h3>
         <h3>${destination}</h3>
         <h3>${departure}</h3>
         <h3>${frequency}</h3>
         <h3>${trainArrival}</h3>
         <h3>${nextTrain}</h3>
         `
        document.querySelector('#trainInput').append(docElem)
    })
})

