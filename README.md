# ACTAM-Project
---
The aim of the project is to create a DAW that is intuitive and simple to use for those approaching music production for the first time.
The software gives you the ability to do multiple things:
1. Ability to play a keyboard, a guitar, a drums and a bass
2. Possibility to record all the instruments and play the recorded material
3. Ability to manage the volume and more of the instruments
4. Possibility to record your voice with the PC microphone
5. Loop the tracks
6. Metronome
7. Remove tools and records

### Model-View-Controller
To structure the project we used the model-view-controller pattern. All three are js files in the project. In the model we save the application information, we note the current status of the operations, which tools i have created and the management of records. For instruments and recordings we have also created classes to simplify management.

The controller is responsible for understanding what needs to be done and which functions to call at a given moment. HTML elements have associated functions within the controller.

The view takes care of the graphic elements and the creation of html elements. In fact, we have only one html page that changes dynamically thanks to javascript.

All the other js files refer to the creation of musical instruments or other things which for greater clarity we have separated from the rest.

We also have many css files that take care of the styling of the graphic elements.

### Technologies and libraries
To make the instruments play we decided to use **samples**, which were loaded into the project, a library that was useful to us is **Howler**. It allowed us to create objects from each sample and gave us the ability to manage characteristics such as volume.

--->> Posso parlare dell'oggetto MediaRecorder

### Project-related challenges
The biggest difficulty of the project was its heterogeneity. A DAW allows you to carry out various operations and we have not taken the effort to report the most important ones.
We wondered how to record the instruments. At the fie we opted for 2 different approaches, one for the voice and another for the rest. The instruments save what has been played in terms of notes and timestamps and then takes care of searching for the associated sounds again. The voice, however, thanks to a MediaRecorder object, records and saves the incoming data.

--> Difficoltà legate ai vari strumenti

Group:
- [@ChiaraAuriemma](https://github.com/ChiaraAuriemma)
- [@enry1897](https://github.com/enry1897)
- [@AnnaFusari](https://github.com/AnnaFusari)
  
----> Aggiungere video e immagini
