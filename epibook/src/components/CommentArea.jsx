import { useState, useEffect } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

const CommentArea = function (props) {
  // state = {
  //   comments: [],
  //   isLoading: false,
  //   isError: false,
  // }
  const  [comments, setComments]  = useState([])
  const  [isLoading, setIsLoading]  = useState(false)
  const  [isError, setIsError]  = useState(false)


  // componentDidMount = async () => {
  //   try {
  //     let response = await fetch(
  //       'https://striveschool-api.herokuapp.com/api/comments/' +
  //         this.props.asin,
  //       {
  //         headers: {
  //           Authorization:
  //             'Bearer inserisci-qui-il-tuo-token',
  //         },
  //       }
  //     )
  //     console.log(response)
  //     if (response.ok) {
  //       let comments = await response.json()
  //       this.setState({ comments: comments, isLoading: false, isError: false })
  //     } else {
  //       console.log('error')
  //       this.setState({ isLoading: false, isError: true })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     this.setState({ isLoading: false, isError: true })
  //   }
  // }
  useEffect(() => {
   (async () => {
      // this.setState({
      //   isLoading: true,
      // })
      isLoading(true)
      try {
        let response = await fetch(
          'https://striveschool-api.herokuapp.com/api/comments/' +
            props.asin,
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTFmMjE4ZjIzZTc0MDAwMTVmN2ZkZGYiLCJpYXQiOjE3NjM2NDc4ODcsImV4cCI6MTc2NDg1NzQ4N30.bUKzmEZrP_XuInVZkHwAnbFFrLLQdMQ-Na7FLIh6oYo',
            },
          }
        )
        console.log(response)
        if (response.ok) {
          let comments = await response.json()
          // this.setState({
          //   comments: comments,
          //   isLoading: false,
          //   isError: false,
          // })
          setComments(comments)
          setIsLoading(false)
          setIsError(false)
        } else {
          // this.setState({ isLoading: false, isError: true })
          setIsLoading(false)
          setIsError(true)
        }
      } catch (error) {
        console.log(error)
        // this.setState({ isLoading: false, isError: true })
        setIsLoading(false)
        setIsError(true)
      }})
  
  }, [props.asin])

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  )

}

export default CommentArea
