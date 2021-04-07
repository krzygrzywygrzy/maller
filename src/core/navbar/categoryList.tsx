import {useEffect} from 'react';
import { connect } from 'react-redux';
import Categories from '../../interfaces/categories';




const CategoryList = (props: any) => {
    //props
    const categories: Categories = props.categories;


    useEffect(() => {
        //TODO: resolve missing dependency 'categories.main' warning

        const displaySubmenu = (e: any) => {
            if(e.target.tagName === "LI"){
                let index: Number = categories.main.indexOf(e.target.innerText);
                console.log(index);
            }
        }

        document.addEventListener("mouseover", displaySubmenu);

        return () => {
            document.removeEventListener("mouseover", displaySubmenu);
        }
    }, []);



    return (
        <div className="category-list">
            <div className="cl-section">
                <ul>
                    {categories.main.map((element, index) => {
                        return <li key={index}>{element}</li>
                    })}
                </ul>
            </div>
            <div className="cl-section">adasdasd</div>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        categories: state.categories,
    }
}

export default connect(mapStateToProps)(CategoryList);