# Jello
*A collaboration between Matt Taylor, Dylan Besonen, and Will MacCarty.*
## Table of Contents 
- [Jello Overview](#jello-overview)
- [Application Architecture and Technologies Involved](#application-architecture)
- [Front End Overview](#front-end-overview)
- [Back End Overview](#back-end-overview)
- [Moving Forward](#moving-forward)
## Jello Overview
Jello is based on the real web-based Trello site - a collaboration site that uses "boards" to organize users' projects.
</br>
</br>
The front end was built using HTML, CSS, Material-UI, React, and Redux, while the back end was developed using Flask, SQLAlchemy, Alembic and PostgreSQL.
</br>
</br>
Users can explore their personal projects/boards, the lists within those boards, and the individual tasks within the lists.
</br>
</br>
Gif showing normal activity coming soon!
</br>
</br>
## Application Architecture
![Jello Architecture](https://raw.githubusercontent.com/MatthewTaylor9758/Jello-app/master/client/src/images/Jello%20Architecture.png)
</br>
</br>
## Front End Overview
### React
React components are used throughout the site to provide a seamless UX, whether that be navigating from board to board, creating a new board, creating a new list, adding tasks to a list, and so on.</br>
</br>
### Redux
Redux, react-redux, and redux-thunk are the foundation that manage the application's state, and provide requests and responses between the React front end and the Flask based back end.
</br>
</br>
In most instances, the front end will react to a change the user makes and send that change to Redux. From there Redux will update its store and then send that information to the Flask based server. Since the Redux store has the information on the change that was made, the Redux store will persist the data between refreshes just as designed.
</br>
</br>
### Material-UI
Material-UI was chosen because mainly because of its built in functions and models. It has many models that can be used, but not only that, you can build on those models to create a custom look with the base that Material-UI gave you. It is very handy, and made our design much more efficient and elegant.
```
                <Grid item xs={3}>
                  <Card onClick={handleOpen} className={classes.Createboard}>
                    Create Board
                    </Card>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    <Grid style={modalStyle} className={classes.paper}>
                      <Grid item xs={8}>
                        <form className={classes.modalForm}>
                          <div style={{ backgroundColor: dynamicColor }} className={classes.inputContainer}>
                            <InputBase autoFocus className={classes.modalInput} classes={{ focused: classes.modalInputFocused }} placeholder="Add Board Title" name="title" value={title} onChange={handleBoard} />
                          </div>
                          <button className={classes.formButton} onClick={handleSubmit}>Create Board</button>
                        </form>
                      </Grid>
                      <Grid container item xs={2} className={classes.templates}>
                        <Grid item xs={4}>
                          <Card className={classes.blue} onClick={() => setDynamicColor("rgb(0, 121, 191)")} />
                        </Grid>
                        <Grid item xs={4}>
                          <Card className={classes.green} onClick={() => setDynamicColor("green")} />
                        </Grid>
                        <Grid item xs={4}>
                          <Card className={classes.red} onClick={() => setDynamicColor("red")} />
                        </Grid>
                        <Grid item xs={4}>
                          <Card className={classes.orange} onClick={() => setDynamicColor("orange")} />
                        </Grid>
                        <Grid item xs={4}>
                          <Card className={classes.tan} onClick={() => setDynamicColor("tan")} />
                        </Grid>
                        <Grid item xs={4}>
                          <Card className={classes.purple} onClick={() => setDynamicColor("purple")} />
                        </Grid>
                        <Grid item xs={4}>
                          <Card className={classes.black} onClick={() => setDynamicColor("black")} />
                        </Grid>
                        <Grid item xs={4}>
                          <Card className={classes.pink} onClick={() => setDynamicColor("pink")} />
                        </Grid>
                        <Grid item xs={4}>
                          <Card className={classes.grey} onClick={() => setDynamicColor("grey")} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Modal>
                </Grid>
```
The code above is an example of our integration of React, the ever-useful JSX, the "useState" React hook (setDynamicColor), and Material-UI. It uses classes and models from Material-UI that we built our own CSS into as well as the Grid system from Material-UI. The effect of using all of these together is when a user clicks "create board" a modal will pop up that a user can use to pick from 9 different colors, and see the changes happen dynamically.
</br>
## Back End Overview
### Flask
We decided to use the Flask framework for its intuitive approach to creating a server. Flask interacts with SQLAlchemy, PostgreSQL and Alembic seamlessly and helped streamline our interactions with the database in all facets.
</br>
</br>
### PostgreSQL
We leveraged PostgreSQL's ability to use different transactions, foreign keys, subqueries, triggers, and different user-defined types and functions to create our site. Flask, SQLAlchemy and PostgreSQL work together to make our database construction, alterations, and interactions smoother.
</br>
</br>
### SQLAlchemy
We chose the SQLAlchemy ORM for its ease of mapping, its far superior readability when compared to other ORMs, and the intuitive nature with which you can create models. When combined with our other back end technologies, it makes for a fantastic experience. Oh, and SQLAlchemy has amazing documentation so that always helps!
</br>
</br>
### Alembic
We landed on Alembic naturally, being so close to SQLAlchemy, and we thrived using its almost instinctual method of creating migrations and interacting with SQLAlchemy to make the necessary changes to our database.

## Moving Forward
The next thing to do would be to implement AWS to have users be able to add pictures to their profiles. I would also add in some more drag and drop functionality. I would also like to add in more colors to choose from in the "create board" modal.

### Thank You

I sincerely apprectiate the time you have taken out of your day to read this far and parse through the site we had a ton of fun making! Our team was fantastic and I cannot wait to work with them again in the future!

### Credits:

<ul>
  <li>Gifs: Giphy.com</li>
  <li>Architecture Diagram is courtesy of</li> 
</ul>
