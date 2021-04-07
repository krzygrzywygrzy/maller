import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Categories from '../../interfaces/categories';
import { Link } from 'wouter';

const CategoryList = (props: any) => {
    //TODO: resolve Type 'Number' cannot be used as an index type.
    const [subcat, setSub] = useState<any | null>(null);
    
    //props
    const categories: Categories = props.categories;

    useEffect(() => {
        //TODO: resolve missing dependency 'categories.main' warning

        const displaySubmenu = (e: any) => {
            if(e.target.tagName === "LI" && e.target.id === "main-cat"){
                let index: Number = categories.main.indexOf(e.target.innerText);
                setSub(index);
            }
        }

        document.addEventListener("mouseover", displaySubmenu);
        
        return () => {
            document.removeEventListener("mouseover", displaySubmenu);
        }
    }, []);

    return (
        <div className="category-list">
            <div className="cl-section border-right">
                <ul>
                    {categories.main.map((el, index) => {
                        return <li key={index} id="main-cat">
                            <Link href="/results">{el}</Link>
                        </li>;
                    })}
                </ul>
            </div>
            <div className="cl-section">
                {subcat === null ? <div></div> : 
                <div>
                    <ul>
                        {categories.sub[subcat].map((el, index)=> {
                           return <li key={index}>
                               <Link href="/results">{el}</Link>
                            </li>;
                        })}
                    </ul>
                </div>}
            </div>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        categories: state.categories,
    }
}

export default connect(mapStateToProps)(CategoryList);