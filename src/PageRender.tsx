import React from 'react'
import { useParams } from 'react-router-dom'
import Notfound from './components/global/Notfound'
import { IParams } from './utills/TypeScript'

const generatePage=(name:string)=>{
    const component = ()=> require(`./pages/${name}`).default
    try{
        return React.createElement(component());
    }catch(err){
        return <Notfound/>
    }
}

const PageRender = () => {
    const {page, slug} = useParams();

    let name = ''

    if(page){
        name = slug? `${page}/${slug}` : `${page}`
    }
    
    return generatePage(name)
}

export default PageRender

