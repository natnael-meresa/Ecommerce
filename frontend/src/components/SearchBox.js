import React, {useState} from 'react'
import {Form, Button, FormControl} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
const SearchBox = () => {
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()
    const searchHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            navigate(`/search/${keyword}`)
        }else {
            navigate('/')
        }
    }
    return (
        <Form onSubmit={searchHandler} className="d-flex searchbox" inline >
            <FormControl type='search' name='q' onChange={(e) => setKeyword(e.target.value)} placeholder='Search Products...' className='input-box me-2 mr-sm ml-sm-5' aria-label="Search">
            </FormControl>
            <Button type='submit' variant='outline-success' className='p-2'>Search</Button>

        </Form>
    )
}

export default SearchBox