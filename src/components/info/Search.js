import React, { Component } from 'react';

class Search extends Component {
    render() {
        return (
            <div className="container search">
                <form id="searchForm" className="form-inline" onSubmit={this.props.handleSubmit}>
                    <input type="text" className="form-control anime-input" id="searchText" placeholder="Search Anime"></input>
                    <button className="btn btn-link btn-sm" id="search-btn"><i className="fas fa-search"></i></button>
                </form>
            </div>
        )
    }
}
export default Search