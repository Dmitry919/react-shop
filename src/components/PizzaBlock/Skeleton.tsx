import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton: React.FC = () => (
  <ContentLoader 
  className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
       <circle cx="134" cy="136" r="125" /> 
    <rect x="0" y="277" rx="10" ry="10" width="280" height="13" /> 
    <rect x="2" y="310" rx="10" ry="10" width="280" height="88" /> 
    <rect x="12" y="423" rx="10" ry="10" width="90" height="30" /> 
    <rect x="125" y="418" rx="25" ry="25" width="150" height="45" />
  </ContentLoader>
)

export default Skeleton