import React, { useState, useEffect} from 'react';
import './App.css';
import Post from'./Post.js';
import { auth, db }from './firebase';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
import ImageLoad from './ImageLoad';
import Stories from "./Stories";



/* Stylying from Material UI library*/
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

{/*  component that  handle the page */}
function App() {

  const classes = useStyles();
  const[modalStyle]=useState(getModalStyle);

  {/* setting variable in react, creating an array of posts , useeffect run a piece of code based on a specific condition*/}
  const [posts, setPost] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser]= useState(null);
  const [signIn, setSignIn]= useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        // if user has logged in ..
        console.log(authUser);
        setUser(authUser);
      }
      else{
        // user has logged out
        setUser(null);
      }
    })
    return() => {
      // peform action 
      unsubscribe();
    }
  }, [user, username]);

  useEffect(() => {
    //everytime the page refreshes load this page
    db.collection('posts').orderBy('timestamp').onSnapshot(snapshot => {
      //everytime a new post is added , this code fires

      setPost(snapshot.docs.map(doc => ({
        id: doc.id, //post id 
        post: doc.data() //getting the doc and the data from the doc
      })));

    })

  }, []);

  /* User Authentication set up */
  const signUp = (event) => {
    event.preventDefault();

    //create the user and is there is any error it will catch
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message))

    setOpen(false);
  }

  const OpensignIn = (event) => {
    event.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))

    setSignIn(false);
  }

  return (
    <div className="App">  
          <Modal
          open={open}
          /* when you click outside of the model set the state to be false*/
          onClose={() => setOpen(false)}
          >
          <div style={modalStyle} className={classes.paper}>
          <form className="signUp">
        <div className="app_headerImage">
        <center>
            <img
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
              />
          </center>
        </div>
            <input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            <input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signUp}> Sign Up</Button>
              </form>
        </div>
          </Modal>
          <Modal
          open={signIn}
          /* when you click outside of the model set the state to be false*/
          onClose={() => setSignIn(false)}
          >
          <div style={modalStyle} className={classes.paper}>
          <form className="signUp">
          <center>
            <img
              className="app_headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
              />
          </center>
            <input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={OpensignIn}> Sign In</Button>
              </form>
        </div>
          </Modal>
          <div className="app_header">
            <img
            className="app_headerImage"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt=""
            />   
            
            <div className= "logoutButton">
            {user ? ( 
            <Button onClick={() => auth.signOut()}>Logout</Button>

          ):(
            <div className="loginContainer">
              <Button onClick={() => setSignIn(true) }>Sign In</Button>
            <Button onClick={() => setOpen(true) }>Sign Up</Button>
            </div>
          )}
          </div>
          </div>
          <div className="posts_app">
            <div className="posts">
            <Stories />
          
          {
          {/*Mapping through the post list and output the content*/},
          posts.map(({id, post}) => (
            <Post key= {id} postId={id} user ={user} username = {post.username} caption={post.caption} imageUrl={post.imageUrl} />
          ))
          } 
            {user?.displayName ? (
            <ImageLoad username={user.displayName}/> 

          ):(
            <h3>PLEASE LOGIN TO UPLOAD :) </h3>
          )}   

            </div>
          </div>
    </div>
  );
}

export default App;
