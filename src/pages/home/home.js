import {Link} from "react-router-dom";
import {Container} from "reactstrap";

import classes from './home.module.css'
import Article from "../../components/article/article";
import Footer from "../../components/footer/footer";

const Home = (props) => {
    const {loading, posts} = props;

    const postData = posts?.map(post => <Article key={post._id} post={post}/>)
    return (
        <Container>
            <div className={classes.header}>
                <div>
                    <p className={classes.text}>Blog</p>
                    {props.auth &&
                        <>
                            <Link to="/add-article" className={`${classes.addArticle} ${classes.desktopOnly}`}>
                                Add Article
                            </Link>
                            <Link to="/add-article" className={`${classes.addArticle} ${classes.phone}`}>+</Link>
                        </>
                    }
                </div>
                <div className={classes.links}>
                    {props.auth ? <Link to='/' onClick={props.logoutHandler}>Log out</Link> : <>
                        <Link to='/login'>Login</Link> |{" "}
                        <Link to='/signup'>Signup</Link>
                    </>
                    }
                </div>
            </div>
            <div>
                {loading ? <h3 className='text-center my-5'>Loading...</h3> : postData}
            </div>
            <Footer/>
        </Container>
    )
}

export default Home;