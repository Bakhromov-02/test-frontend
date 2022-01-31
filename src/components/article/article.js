import classes from './article.module.css';
import {capitalizeFirstLetter} from "../../utils";

const Article = props => {
    const options = {   day: 'numeric', month: 'long', year: 'numeric' };

    const tags = props?.post?.tags?.map(tag => capitalizeFirstLetter(tag));

    let date = new Date(props?.post?.createdAt);
    return (
        <div>
            <h3>{props?.post?.title}</h3>
            <p className={classes.date}>
                <span style={{paddingRight: '10px'}}>{date.toLocaleDateString('en-UK', options)}</span> |
                <span style={{color: '#8695A4', paddingLeft: '10px'}}> {tags?.join(', ')}</span></p>
            <p>
                {props?.post?.content}
            </p>
            <hr/>
        </div>
    )
}

export default Article;