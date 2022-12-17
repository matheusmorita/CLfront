import React from 'react'
import Form from '../../molecules/Form'

const WaitingList = () => {
  const sendData = async (email: string) => {
    var data = JSON.stringify({
      "email": email
    });

    var config = {
      method: 'post',
      headers: {
        'X-Parse-Application-Id': 'dR30zBB72X8Hsrquh4DgPWRnJe8Nhd8N8AcQpXVU',
        'X-Parse-REST-API-Key': 'wFa33ak4LMUXxJpFtQbt1qtRaF4ALicVHSzjKFGi',
        'Content-Type': 'application/json'
      },
      body: data
    };

    await fetch('https://parseapi.back4app.com/functions/waiting-list', config)
      .then(resp => resp.json())
      .then(json => {
        console.log(json)
      })
      .catch(error => {
        throw error
      })
  }

  return (
    <Form
      id='waiting-list'
      onSubmit={sendData}
      label="Formulário de Lista VIP"
    >
      
    </Form>
  )
}

export default WaitingList