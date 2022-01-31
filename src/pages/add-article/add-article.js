import {useEffect, useState} from "react";

import {Container, Form, FormGroup, Label, Input} from "reactstrap";
import CreatableSelect from "react-select/creatable";
import {ActionMeta, OnChangeValue} from 'react-select';

import classes from './add-article.module.css';
import Button from "../../components/button/button";
import Footer from "../../components/footer/footer";
import axiosInstance from "../../services/api";
import {capitalizeFirstLetter} from "../../utils";

// const options = [
//     {value: 'chocolate', label: 'Chocolate'},
//     {value: 'strawberry', label: 'Strawberry'},
//     {value: 'vanilla', label: 'Vanilla'},
// ];

const AddArticle = (props) => {
    const [options, setOptions] = useState([]);
    const [tags, setTags] = useState([]);
    const handleChange = (
        OnChangeValue,
        ActionMeta
    ) => {
        // console.group('Value Changed');
        // console.log(OnChangeValue);
        // console.log(`action: ${ActionMeta.action}`);
        // console.groupEnd();
        setTags(OnChangeValue);
    };
    // console.log(tags)
    useEffect(() => {
        axiosInstance.get('/tags')
            .then(res => {
                const options = res?.data?.data?.map(tag => {
                    return {
                        value: tag.tag,
                        label: capitalizeFirstLetter(tag.tag)
                    }
                })
                setOptions(options)
            })
    }, []);

    return (
        <Container>
            <div className={classes.header}>
                Add Article
            </div>
            <Form onSubmit={event => props.createPostHandler(event, tags)}>
                <FormGroup>
                    <Label for="title">
                        Title
                    </Label>
                    <Input
                        id="title"
                        name="title"
                        type="text"
                        required
                        minLength={6}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="content">
                        Content
                    </Label>
                    <Input
                        rows={8}
                        id="content"
                        name="content"
                        type="textarea"
                        required
                        minLength={6}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="content">
                        Tags
                    </Label>
                    <CreatableSelect
                        isMulti
                        // onChange={handleChange}
                        options={options}
                        onChange={handleChange}
                    />
                </FormGroup>

                <Button
                    className='mt-3'
                    type='submit'
                >
                    {props.loading ? 'Loading...' : 'Submit'}
                </Button>
            </Form>
            <Footer/>
        </Container>
    )
}

export default AddArticle;