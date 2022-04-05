import { useState, useEffect } from "react";
import { Button } from '@mui/material';
import { lazy } from 'react'
import Loadable from 'ui-component/Loadable';
const NewUser = Loadable(lazy(() => import('./newUser')));
import { useDispatch, useSelector } from 'react-redux';

export default function UserManager() {
    const [numberForm, setNumberForm] = useState([1])
    const [FormList, setFormList] = useState([])

    const nbChamp = useSelector(state => state.champReducer)

    useEffect(() => {
        setNumberForm(nbChamp)
    }, [nbChamp])


    useEffect(() => {
        const newFormList = [...FormList]
        for (let i = 1; i <= numberForm[0]; i++) {
            newFormList.push(<NewUser key={i + numberForm[0]} />)
        }
        setFormList(newFormList)
    }, [numberForm])


    return (
        <div>
            <div className="userFormGroup">
                {FormList}
            </div>
        </div>
    )
}