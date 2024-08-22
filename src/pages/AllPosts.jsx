import React, { useState,useEffect } from 'react'
import { Container,PostCard } from '../components'
import appwriteService from "../appwrite/config"
import { useSelector } from 'react-redux';
function AllPosts() {
    const [posts,setPosts] = useState([]);
    const userData = useSelector((state)=>state.auth.userData);
   
    useEffect(() => {
      if(userData){
        appwriteService.listDocuments([]).then((posts)=>{
          if(posts){
              setPosts(posts.documents)
              
          }
      })
      }
        
    } , [userData])
  return (
    <div className="w-full h-96 py-8">
        <Container>
          <div className="flex flex-wrap">
            {
                posts.length > 0 && posts.map((post)=>(
                 post.userId === userData.$id?  <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>:null
                ))
            }
          </div>
        </Container>
    </div>
  )
}

export default AllPosts