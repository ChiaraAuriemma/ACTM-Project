# ACTAM-Project


<p align="center">
    <img src="code/images/logo.png" alt="alt text">
</p>

## Group:

- ####  Chiara Auriemma &nbsp;([@ChiaraAuriemma](https://github.com/ChiaraAuriemma))<br> 10722613&nbsp;&nbsp; chiara.auriemma@mail.polimi.it

- ####  Enrico Torres &nbsp;([@enry1897](https://github.com/enry1897))<br> 10727489&nbsp;&nbsp; enrico.torres@mail.polimi.it

- ####  Anna Fusari &nbsp;([@AnnaFusari](https://github.com/AnnaFusari))<br> 10769576&nbsp;&nbsp; anna.fusari@mail.polimi.it

<br><br>
<br>


### About the project
The aim of the project is to create a DAW that is intuitive and simple to use for those approaching music production for the first time.
The software gives you the ability to do multiple things:
1. The ability to choose from different instruments (piano, drums, guitar, and bass) and play them with the application.
2. Ability to play all the described instruments through a MIDI keyboard.
3. Ability to manage the volume and more of the instruments
4. Possibility to record all the instruments and play the recorded material
6. The capability to record your voice using the PC microphone and play it back
7. Ability to determine the length of recordings based on the number of measures you want to record.
8. Capacity to delete recordings and instruments at will.
9. Ability to loop the tracks.
10. Metronome

### Model-View-Controller
To structure the project we used the model-view-controller pattern. All three are js files in the project. In the model we save the application information, we note the current status of the operations, which tools i have created and the management of records. For instruments and recordings we have also created classes to simplify management.

The controller is responsible for understanding what needs to be done and which functions to call at a given moment. HTML elements have associated functions within the controller.

The view takes care of the graphic elements and the creation of html elements. In fact, we have only one html page that changes dynamically thanks to javascript.

All the other js files refer to the creation of musical instruments or other things which for greater clarity we have separated from the rest.

We also have many css files that take care of the styling of the graphic elements.

### Technologies and libraries
- To make the instruments play, we chose a set of sounds personally by exploring available online **samples** and loading them into our project. For their management, we utilized the **Howler** library. We then created lists consisting of Howl objects, which are easy to handle given the methods already available for them.
- For voice recording, we utilized the **MediaRecorder** object, which provides functionality to easily record media. Specifically, it allows starting the recording, configuring it to save the incoming stream, and then, upon stopping, saving the entire content into the model. What we do is create a **blob**, and when it needs to be played back, it is transformed into an **AudioElement**.
- For instrument recording, we chose to save the played **notes** along with their **timestamps**. This allows us to replay them when the user decides to listen to the recording. It seemed like the most practical and resource-efficient approach.
- Regarding MIDI, we handle the arrival of **midimessages**, analyze the received message, and redirect the content to the same functions used to play the virtual instruments of the application.


### Project-related challenges
The biggest difficulty of the project was its heterogeneity. A DAW allows you to carry out various operations, and we chose the ones that seemed most significant to us. The project contained many elements, but we tried to have an as modular approach as possible. Instead of writing dedicated code for each instrument, we created classes and shared as much code as possible for each one. Regarding recording, we adopted a different approach for instruments compared to voice because it seemed more sensible to save information related to notes rather than a much bulkier audio file in terms of memory.The difficulty with MIDI was establishing the correspondence between sounds and keys, but once resolved, we were able to limit the code by reusing functions like noteon and noteoff, which were already used elsewhere to play the sounds.

  
----> Aggiungere video e immagini
