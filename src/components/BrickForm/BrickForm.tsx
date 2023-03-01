import React from 'react';
import { useDispatch, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { 
    chooseSetNum,
    chooseName,
    chooseYear,
    chooseThemeId,
    chooseNumParts,
    chooseSetImgUrl,
    chooseSetUrl 
} from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface BrickFormProps {
    id?:string;
    data?:{}
}



export const BrickForm = (props:BrickFormProps) => {

    const dispatch = useDispatch();
    let { brickData, getData } = useGetData();
    const store = useStore()
    // const name = useSelector<BrickState>(state => state.name)
    const { register, handleSubmit } = useForm({ })

    const onSubmit = async (data:any, event:any) => {
        console.log(props)
        console.log(JSON.stringify(data))

        if( props.id! ){
            await serverCalls.update(props.id!, data)
            console.log(`Updated:${data} ${props.id}`)
            window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseSetNum(data.set_num))
            dispatch(chooseName(data.name))
            dispatch(chooseYear(data.year))
            dispatch(chooseThemeId(data.theme_id))
            dispatch(chooseNumParts(data.num_parts))
            dispatch(chooseSetImgUrl(data.set_img_url))
            dispatch(chooseSetUrl(data.set_url))
            console.log(store.getState())
            await serverCalls.create(store.getState())
            window.location.reload()
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="set_num">Set Number</label>
                    <Input {...register('set_num')} name="set_num" placeholder="Set Number"/>
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <Input {...register('name')} name="name" placeholder="Name"/>
                </div>
                <div>
                    <label htmlFor="year">Year</label>
                    <Input {...register('year')} name="year" placeholder="Year"/>
                </div>
                <div>
                    <label htmlFor="theme_id">Theme Id</label>
                    <Input {...register('theme_id')} name="theme_id" placeholder="Theme Id"/>
                </div>
                <div>
                    <label htmlFor="num_parts">Number of Parts</label>
                    <Input {...register('num_parts')} name="num_parts" placeholder="Number of Parts"/>
                </div>
                <div>
                    <label htmlFor="set_img_url">Set Image Url</label>
                    <Input {...register('set_img_url')} name="set_img_url" placeholder="Set Image Url"/>
                </div>
                <div>
                    <label htmlFor="set_url">Set Info Url</label>
                    <Input {...register('set_url')} name="set_url" placeholder="Set Info Url"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}