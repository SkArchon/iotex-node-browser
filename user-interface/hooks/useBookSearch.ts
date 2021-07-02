import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useScrollSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [data, setData] = (useState([]) as any)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setData([])
  }, [query])

  useEffect(() => {
    setLoading(true);
    setError(false);
    
    axios({
      method: 'POST',
      url: '/node-processed/search',
      data: { ...query, limit: 6, page: pageNumber },
    }).then(({data}) => {
      setData(prevBooks => {
        return [...prevBooks, ...data];
      })
      setHasMore(data.length > 0);
      setLoading(false);
    }).catch(e => {
      setLoading(false);
      setError(true);
    })
  }, [query, pageNumber])

  return { loading, error, data, hasMore }
}