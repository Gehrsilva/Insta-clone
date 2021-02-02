import React, { useState, useEffect} from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import { db } from "./firebase";
import firebase from "firebase";


{/* component that configure the Post */}


function Post({postId, user,username, caption, imageUrl}) {
    const [comments, SetCommentPost] = useState([]);
    const [comment, SetComment] = useState("");

    useEffect(() => {
        let unsubscribe;
        if (postId) {
          unsubscribe = db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                SetCommentPost(snapshot.docs.map((doc) => doc.data()));
            });
        }
        
        return () => {
            unsubscribe();
          };
        }, [postId]);

        const postComment = (event) => {
            event.preventDefault();
        
            db.collection("posts").doc(postId).collection("comments").add({
              text: comment,
              username: user.displayName,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            SetComment('');
          };

    return (

       <div className="post">
           {/* header > avatar + username */}
        <div className="post_header">
            <Avatar
            className="image_avatar"
            alt="gehrsilva"
            src="/static/images/avatar/1.jpg"
            />
            <h3>{username}</h3>
            </div>
             {/* image*/}
            <img
            className ="post_image"
            src ={imageUrl}
            alt= "" />
           

            <h3 className="image_text"><strong>{username}</strong> {caption}</h3>
            {/* username + caption */}

            <div className="post_comments">
                {comments.map((comment) => (
                <h5 className="comment">
                <strong>{comment.username}</strong> {comment.text}
                  
          </h5>
        ))}
      </div>
      <div className="post_app">
          <div className="post_left">
              {
                  postMessage.m
              }
          </div>
      </div>
        <form className="postComment_Box">
          <input
            className="comment_input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => SetComment(e.target.value)}
          />
          <Button
            color="secondary"
            className="comment_button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </Button>
        </form>
     
        </div>
        
    )
}

export default Post
