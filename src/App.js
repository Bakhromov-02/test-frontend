import {useState, useEffect} from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route, Redirect, useHistory} from "react-router-dom";
import {Container} from "reactstrap";

import './App.css';
import Home from "./pages/home/home";
import AddArticle from "./pages/add-article/add-article";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import axiosInstance from "./services/api";

function App() {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [authLoading, setAuthLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        setIsAuth(true);
        const userId = localStorage.getItem('userId');
        setUserId(userId);
    }, []);

    useEffect(() => {
        setLoading(true);
        axiosInstance.get('/posts')
            .then(res => {
                console.log(res.data.data)
                const posts = res?.data?.data?.map(post => {
                    return {
                        title: post.title,
                        content: post.content,
                        createdAt: post?.createdAt,
                        creator: post.creator,
                        tags: post.tags
                    }
                });
                setPosts(posts);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }, []);

    const logoutHandler = () => {
        setToken(null);
        setIsAuth(false);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    }
    const loginHandler = (event) => {
        event.preventDefault();
        setAuthLoading(true);
        const email = event.target[0].value;
        const password = event.target[1].value;
        const data = {
            email: email,
            password: password
        }
        axiosInstance.post('login', data)
            .then(res => {
                console.log(res.data);
                setIsAuth(true);
                setToken(res.data.token);
                setUserId(res.data.userId)
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', res.data.userId);
                setAuthLoading(false);
                // if (location.state?.from){
                //     navigate(location.state.from);
                // }
                history.push('/');
            })
            .catch(err => {
                console.log(err)
                setIsAuth(false);
                setAuthLoading(false);
            })
    }
    const createPostHandler = (event, tags) => {
        event.preventDefault();
        setAuthLoading(true);
        const temp = [];
        tags.map(tag => {
            temp.push(tag.value)
        })
        const data = {
            title: event.target[0].value,
            content: event.target[1].value,
            tags: temp,
            userId: userId
        }
        axiosInstance.post('/create-post', data)
            .then(res => {
                console.log(res.data)
                setAuthLoading(false);
                setPosts([ {...data}, ...posts]);
                history.push('/');
            })
            .catch(err => {
                console.log(err);
                setAuthLoading(false);
            })
    }


    let routes = (
        <Switch>
            <Route exact path="/add-article"
                   render={() => <AddArticle loading={authLoading} createPostHandler={createPostHandler}/>}/>
            <Route exact path="/"
                   render={() => <Home auth={isAuth} logoutHandler={logoutHandler} loading={loading} posts={posts}/>}/>
            <Route path='*'><Redirect to='/'/></Route>
        </Switch>

    )
    if (!isAuth) {
        routes = (
            <Switch>
                <Route exact path="/" render={() => <Home auth={isAuth} logoutHandler={logoutHandler} loading={loading}
                                                          posts={posts}/>}/>
                <Route exact path="/login" render={() => <Login loginHandler={loginHandler} loading={authLoading}/>}/>
                <Route exact path="/signup" render={() => <Signup/>}/>
                <Route path='*'><Redirect to='/'/></Route>
            </Switch>
        )
    }

    return (
        <Container>
            {routes}
        </Container>
    );
}

export default App;
