import React from 'react';
import './index.css';

function List({posts}) {

    return(
      <div>
        {posts.map((post, index) => {
          return(
            <div className='newPost' key={index}>
              <div className='mainP'>
                <h4>
                  {post.title}
                </h4>
                <p>
                {post.url}
                </p>
              </div>
              <div className='footP'>
                <p>
                  {post.points} points | {post.author} | {post.created_at} | {post.num_comments} comments
                </p>
              </div>

          </div>
          )
        }
      )}
    </div>
    )
}
export default List;