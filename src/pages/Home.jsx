import React, { useEffect, useState } from 'react'
import appWriteService from "../appwrite/config";
import { Container, PostCard } from '../components';
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([]);
    const status = useSelector((state) => state.auth.status);
    useEffect(()=>{
        if(status){
            appWriteService.listDocuments([]).then((posts)=>{
                console.log(posts)
                if(posts){
                    setPosts(posts.documents)
                   
                }
            })
        }
        
    },[])
    

    if( !status  ){
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts   
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
  return (
    <div className="w-full py-8">
        <Container>
            <div className="flex flex-wrap">
                {
                   posts && posts.map((post)=>(
                     post.status === "active"?   (<div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div> ): null
                    ))
                }
            </div>
        </Container>
    </div>
  )
}

export default Home