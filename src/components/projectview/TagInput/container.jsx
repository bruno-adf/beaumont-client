import { useState } from "react"

export default function TagInput(Component) {

    return function Container (props) {

        const [tagArray, setTagArray] = useState([])
        const [value, setValue] = useState('')
    
        const handleInputChange = (e) => {
            setValue(e.target.value)
        }
    
        const handleAdd = (e) => {
            if(e.keyCode !== 13 || !value) return
            setTagArray((prevArray) => [...prevArray, value])
            setValue('')
        }
    
        const handleRemove = (index) => {
            let newArray = [...tagArray]
            newArray.splice(index, 1)
            setTagArray(newArray)
        }

        return <Component
            label={props.label}
            value={value}
            tagArray={tagArray}
            handleAdd={handleAdd}
            handleRemove={handleRemove}
            handleInputChange={handleInputChange}
        />
    }
}

// export default class TagInput extends Component {

//     handleInputChange = (e) => {
//         setValue(e.target.value)
//     }

//     handleAdd = (e) => {
//         // console.log('tecla:', e)
//         // if(e.keyCode !== 13)
//         // return
//         setTagArray((prevArray) => [...prevArray, value])
//         this.setState
//     }

//     handleRemove = (index) => {
//         console.log(index)
//         let newArray = tagArray
//         newArray.splice(index, 1)
//         setTagArray((newArray))
//     }

//     render() {
//         return <Component
//             value={value}
//             tagArray={tagArray}
//             handleAdd={this.handleAdd}
//             handleRemove={this.handleRemove}
//             handleInputChange={this.handleInputChange}
//         />
//     }
// }

