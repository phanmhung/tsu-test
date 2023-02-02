import React from 'react'
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import NavHead from '../components/NavHead';
import Profile from '../components/Profile';

function UserProfile() {
    let {id} = useParams<{id:string}>();
  return (
    <>
    <NavHead/>
    <Container>
    {id!== undefined ? <Profile id={id}/> : <div>Not Found</div>}
    </Container>
    </>
  )
}

export default UserProfile