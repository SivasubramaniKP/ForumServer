import express  from "express";
import * as fs from "fs"
import cors from "cors"
const app = express();
const PORT = 5000
const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));

let Data = [
    {
      id:0,
      title:"Double Contact Chained Ellipses Problem",
      body:" few years ago, when I played around with GeoGebra, Unfortunately I cannot prove or disprove this proposition by myself. My numerical experiments on GeoGebra show that the above claim is most likely true, but I am not 100% sure. I even posted this problem on Art of Problem Solving on December 28, 2022, but no solutions are known so far.",
      upVotes:0,
      downvotes:0,
      author:"Kurt Godel",
      tag:["geometry","circle","Conic Sections"],
      answers:[{
        qid : 0,
        aid : 0,
        ans:"Older versions of the MacOS can still use the regular Unix installer available on the TUG web site:",
        author:"Derek Muller",
        upVotes:10,
        downvotes:1
      }],
      dept:["cse","ece","it"]

    },
    {
      id:1,
      title:"How smooth/rough is a liquid surface?",
      upVotes:7,
      downvotes:0,
      author:"Kurt Godel",
      tag:["Physics","Fluid Mechanics"],
      answers:[{
          qid : 1,
          aid : 0,
        ans:"I'm currently working on a similar thing. First of all, roughness is not an absolute unit as it depends on the object to be analyzed (the smooth or rough one) and the object that intercalates on that surface. In a macro and super-simple approach we could use friction as a measure of roughness. Moving to a medium scale we can thing on a surface of a material with peaks and valleys, in that case you can measure the frequencie and the absolute depth of those peaks (statistics). But I think that you want something even more little, that is my field. In that case usually depends on what do you want to intercalate in that surface, for different elements or molecules you can assume a surface as smooth as it can not be adsorbed easily in the surface.",
        author:"Max Verstappen",
        upVotes:13,
        downvotes:2

      }],
      dept:["civil","mect","eee"]
    },{
      id:2,
      title:"How do I distinguish between e the natural log base and a variable conventionally referred to as e?",
      body:" How does one distinguish between the natural base, usually indicated with e and a coefficient that, due to historical reasons, is referred to as e (such as in Weibull functions for dose-response)?",
      upVotes:7,
      downvotes:0,
      author:"Tarik Celik",
      tag:["notation"],
      answers:[{
          qid : 2,
          aid : 0,
        ans:"I searched the internet for Weibul functions for dose-response and found Christian Ritz's GitHub reference for Weibull model functions, which demonstrates a technique that seems reasonable: Since e is the standard name of a parameter, it can't be used for the base of the natural exponential function. As such, exp is used instead of e⋅ to represent the exponential function, as in: few years ago, when I played around with GeoGebra, Unfortunately I cannot prove or disprove this proposition by myself. My numerical experiments on GeoGebra show that the above claim is most likely true, but I am not 100% sure. I even posted this problem on Art of Problem Solving on December 28, 2022, but no solutions are known so far",
        author:"Kyedae",
        upVotes:4,
        downvotes:0
      },
      { 
          qid : 2,
          aid : 1,
        ans:"n printed mathematics, the natural base should be set in roman type: e, while symbols representing quantities that can vary (depending on context or units) should use the usual italic font: e.(Added in response to comment) In general, roman type should be used for all symbols in mathematics that have a fixed meaning: i,j,k for the base elements of the complex numbers and quaternions; exp,ln,cos, and so on for standard functions; lim,sup,argmin for standard operations; the differential symbol d",
        author:"MOnesy",
        upVotes:3,
        downvotes:10
      }],
      dept:["csbs","misc","ece","eee"]
      
  
   
    }
  ];

let userData = [
    {
        id : 1,
        name : "Sivasu",
        QuestionID : [],
        password : "tts@0208",
        mail : "sivasubramani.kp@gmail.com",
        isSignedIn : false,
        upVotedPosts : [],
        downVotedPosts : [],
        upVotedAnswers : [],
        downVotedAnswers : []
        
    }
]


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.get("/user",(req,res) => {
    res.json(userData)
})

app.get("/", (req,res) => {
    
    res.json(Data)
});

app.post("/postQuestion",(req,res) => {
    // Adding New Question
    const newQuestion = {
        id : Data.length + 1,
        title : req.body.title,
        body : req.body.body,
        upVotes : 0,
        downvotes : 0,
        answers : [],
        tag : (req.body.tag).split(","),
        dept : (req.body.dept).split(","),
        author : req.body.author

    }
    // Pushing the question to the mock database
    Data.push(newQuestion);
    res.json(newQuestion);
});

app.post("/signUp", (req,res) => {
    const userName = req.body.name;
    const password = req.body.password;

    let isThisUserThereAlready;
    userData.forEach( (user) => {
        if (user.name === userName) isThisUserThereAlready = true;
    })
    if (!isThisUserThereAlready){
    const newUser = {
        id : userData.length + 1,
        name : userName,
        password : password,
        QuestionID : [],
        isSignedIn : true,
        mail : "",
        upVotedPosts : [],
        downVotedPosts : [],
        upVotedAnswers : [],
        downVotedAnswers : []


    }
    userData.push(newUser);
    res.send("created")

}else {
    res.send("exist")
}
    
});


app.post("/signIn", (req,res) => {
    const userName = req.body.name;
    const password = req.body.password;
    
    let isPasswordValid = false;
    userData.forEach((user) => {
        if ( user.name == userName ) {
            if ( user.password == password) {
                isPasswordValid = true;
            }
        }
    })
    if ( isPasswordValid ) {
        res.send(true);

    } else {
        res.send(false)
    }

});

app.get("/getQuestion/:id", (req,res) => {
    const id = parseInt(req.params.id);
    let questionRequired;
    Data.forEach((q) => {
        if ( q.id === id ) questionRequired = q;
    })
    res.json(questionRequired)
});



app.patch("/upVote/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const userName = req.body.userName;
    let requiredQuestion;
    Data.forEach((q) => {
        if (q.id === id) requiredQuestion = q
    });
    const requiredID = Data.indexOf(requiredQuestion);
    let postedUser;
    userData.forEach( (u) => {
        if (u.name == userName) postedUser = u
    });
     const postedUserId = userData.indexOf(postedUser);
        
    if ( !(postedUserId === -1) && !userData[postedUserId].upVotedPosts.includes(id))
    {
        userData[postedUserId].upVotedPosts.push(id);
        Data[requiredID].upVotes += 1;
        res.json(Data);

    }
    
})

app.patch("/DownVote/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const userName = req.body.userName;
    let requiredQuestion;
    Data.forEach((q) => {
        if (q.id === id) requiredQuestion = q
    });
    console.log(requiredQuestion);
    const requiredID = Data.indexOf(requiredQuestion);
    
    let postedUser;
    userData.forEach( (u) => {
        if (u.name == userName) postedUser = u
    });
    
     const postedUserId = userData.indexOf(postedUser);
 
    if ( !(postedUserId === -1) && !userData[postedUserId].downVotedPosts.includes(id))
    {
        userData[postedUserId].downVotedPosts.push(id);
        Data[requiredID].downvotes += 1;
        res.json(Data);

    }
    
});


app.patch("/postAnswer/:id", (req,res) => {
    const qid = req.params.id
    const body = req.body.body;
    const userName = req.body.userName
    let question;
    Data.forEach((q) => {
        if (q.id == qid ) question = q
    }) ;
    const newAnswer = {
        ans : body,
        author : userName,
        upVotes : 0,
        downvotes  : 0,
        qid : parseInt(qid),
        aid : question.answers.length
    };
    
  
    const qIndex = Data.indexOf(question);
    Data[qIndex].answers.push(newAnswer);
    res.json(Data[qIndex]);

});

app.patch("/upVoteAnswer", (req,res) => {
    const qid = req.body.qid;
    const ansIndex = req.body.ansIndex;
    const userName = req.body.userName;
    let requiredQuestion;
    Data.forEach((q) => {
        if ( q.id == qid ) requiredQuestion = q; 
    })
    
    const AnsArray = requiredQuestion.answers;
    // console.log(AnsArray);
    let requiredAnswer;
    AnsArray.forEach((a) => {
        if ( a.aid == ansIndex ) requiredAnswer = a;
    });
    const requiredAnswerIndex = Data[qid].answers.indexOf(requiredAnswer);

    let requiredUserId;
    userData.forEach((u) => {
        if (userName == u.name) requiredUserId = u;
    })
    const uIndex = userData.indexOf(requiredUserId)
    console.log(uIndex);
    if( uIndex !== -1 && !userData[uIndex].upVotedAnswers.includes(requiredAnswer)){
        userData[uIndex].upVotedAnswers.push(requiredAnswer);
        Data[qid].answers[requiredAnswerIndex].upVotes += 1;
        const index = userData[uIndex].downVotedAnswers.indexOf(requiredAnswer);
        if (index > -1) { // only splice array when item is found
            userData[uIndex].downVotedAnswers.splice(index, 1); // 2nd parameter means remove one item only
          }

    }
    res.json(Data);

})

app.patch("/downVoteAnswer", (req,res) => {
    const qid = req.body.qid;
    const ansIndex = req.body.ansIndex;
    const userName = req.body.userName;
    let requiredQuestion;
    Data.forEach((q) => {
        if ( q.id == qid ) requiredQuestion = q; 
    })
    
    const AnsArray = requiredQuestion.answers;
    // console.log(AnsArray);
    let requiredAnswer;
    AnsArray.forEach((a) => {
        if ( a.aid == ansIndex ) requiredAnswer = a;
    });
    const requiredAnswerIndex = Data[qid].answers.indexOf(requiredAnswer);

    let requiredUserId;
    userData.forEach((u) => {
        if (userName == u.name) requiredUserId = u;
    })
    const uIndex = userData.indexOf(requiredUserId)
    console.log(uIndex);
    if( uIndex !== -1 && !userData[uIndex].downVotedAnswers.includes(requiredAnswer)){
        userData[uIndex].downVotedAnswers.push(requiredAnswer);
        Data[qid].answers[requiredAnswerIndex].downvotes += 1;
        const index = userData[uIndex].upVotedPosts.indexOf(requiredAnswer);
        if (index > -1) { // only splice array when item is found
            userData[uIndex].upVotedAnswers.splice(index, 1); // 2nd parameter means remove one item only
        }

        console.log(userData[uIndex].downVotedAnswers);
        console.log(userData[uIndex].upVotedAnswers)        

    }
    res.json(Data);

})



app.listen(PORT, () => {
    console.log("Listening On Port 5000")
})