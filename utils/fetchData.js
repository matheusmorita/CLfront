export const fetchData = async (setProjects) => {
  var data = JSON.stringify({
    "limit": 4
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

  await fetch('https://parseapi.back4app.com/parse/functions/retornar-projetoV2', config)
    .then(resp => resp.json())
    .then(json => {
      setProjects(Object.values(json.result))
    })
    .catch(error => {
      throw error
    })
}