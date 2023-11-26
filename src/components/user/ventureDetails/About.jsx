import Card from "../common/Card"
const About = ({content}) => {
console.log('content in about',content)
    return (

        <div className=" h-1/2 w-full font-Outfit " >

          <p>{content}</p>

        </div>
    )

}

export default About