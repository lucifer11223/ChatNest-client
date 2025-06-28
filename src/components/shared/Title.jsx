import { Helmet } from "react-helmet-async"

const Title = ({
  title = "ChatNest",
  description = "Thus is our chatting app"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
    </Helmet>
  )
}

export default Title