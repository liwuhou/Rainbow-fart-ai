
fetch('https://gpt.baixing.com?p="echo hello"&k=NK2ASGAU')
  .then(res => {
    return res.json()
  })
  .then((res) => console.log(res))