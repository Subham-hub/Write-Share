import React from 'react'

import classes from './css/WatchMore.module.css'

const WatchMore = () => {
  return (
    <>
      <div
        class={`${classes['home-articles']} ${classes['max-width-1']} ${classes['m-auto']} ${classes.font2}`}
      >
        <h2>People who read this also read</h2>
        <div class={classes.row}>
          <div class={`${classes['home-article']} ${classes['more-post']}`}>
            <div class={classes['home-article-img']}>
              <img src="https://picsum.photos/500/300?random=1" alt="article" />
            </div>
            <div
              class={`${classes['home-article-content']} ${classes.font1} center`}
            >
              <a href="/blogpost.html">
                <h3>
                  Learn more about Machine Learning techniques in India by
                  joining this channel
                </h3>
              </a>

              <div>Author Name</div>
              <span>07 January | 6 min read</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WatchMore
