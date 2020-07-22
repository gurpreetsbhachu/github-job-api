import React, { useState } from 'react';
import useFetchJobs from './useFetchJobs.js';
import { Container, Alert } from 'react-bootstrap'
import Job from './Job'
import JobsPagination from './JobsPagination'
import SearchForm from './SearchForm'

function App() {

  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  const{jobs, loading, error, hasNextPage} = useFetchJobs(params, page)

  function handleParamChange(e){
    const param = e.target.name
    const value = e.target.value
    setPage(1)
    setParams(prevParams => {
      return { ...prevParams, [param]: value }
    })
  }

  return (
    <Container className="my-4">
      <h2 className="mb-4">Github Jobs - A React Project</h2>
      <SearchForm params={params} onParamChange = {handleParamChange}/>
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage}/>
      {loading && <Alert variant="light" className="text-center">Loading..</Alert> }
      {error && <Alert variant="danger" className="text-center">Error. Try Refreshing.</Alert>}
      {jobs.map(job => {
        return <Job key={job.id} job={job}/>
      })}
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage}/>
    </Container>
  );
}

export default App;
