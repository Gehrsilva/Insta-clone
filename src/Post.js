import React from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';

{/* component that configure the Post */}


function Post({username, caption, imageUrl}) {
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
        </div>
    )
}

export default Post
