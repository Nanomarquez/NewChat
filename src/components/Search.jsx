import React, { useContext, useState } from 'react'
import {doc,updateDoc, collection,getDoc , getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import {db} from '../firebase'
import {AuthContext} from '../context/AuthContext'
import Loading from './Loading'

function Search() {

  const [username,setUserName] = useState("");
  const [user,setUser] = useState(null);
  const [err,setErr] = useState(false);
  const {currentUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    setLoading(true)
    const q = query(collection(db, "users"),where("displayName","==",username))

    try {      
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc)=>{
        setUser(doc.data())
      })
    } catch (error) {
      setErr(true)
    }
    setLoading(false)
    setUserName("")
  }


  const handleKey = (e) =>{
    e.code=== "Enter" && handleSearch()
  }

  const handleSelect = async () => {
    const combineID = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
    try {
      const res = await getDoc(doc(db,"chats",combineID))
      if(!res.exists()){
        await setDoc(doc(db,"chats",combineID),{messages:[]})
        await updateDoc(doc(db,"userChats",currentUser.uid),{
          [combineID+".userInfo"]:{
            uid:user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combineID+".date"]:serverTimestamp()
        })
        await updateDoc(doc(db,"userChats",user.uid),{
          [combineID+".userInfo"]:{
            uid:currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combineID+".date"]:serverTimestamp()
        })
      }
    } catch (error) {
      setErr(true)
    }
    setUser(null)
    setUserName("")
  }

  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Find users' onChange={e=>setUserName(e.target.value)} onKeyDown={handleKey} value={username}/>
      </div>
      {loading && <div className='error'><Loading/></div> }
      {err && <span style={{color:"#ffffff"}}>User not found!</span> }
      {user && <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search