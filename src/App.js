import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';
import Maps from './components/maps';
import 'bootstrap/dist/css/bootstrap.min.css';
import Flickrimg from './components/Flickrimg';
import ReactPaginate from 'react-paginate';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pictures: {
        photos: {
          photo: [],
        },
      },
      currentPage: 1,
      lat: 37.778519,
      lng: -122.40564
    }
    this.handlePageClick = this.handlePageClick.bind(this);
    this.onClick = this.onClick.bind(this);

  };



  async componentDidMount() {
    this.setState({ loading: true });
    const res = await Axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e7afd2454d45bfd6f4c5b14bec289d53&page=1&per_page=100&lat=48.261241&lon=7.527866&format=json&nojsoncallback=1`);
    this.setState({ pictures: res.data, loading: false });
  }

  receivedData = async pageno => {
    this.setState({ loading: true });
    const res = await Axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e7afd2454d45bfd6f4c5b14bec289d53&&page=${this.state.currentPage}&lat=48.261241&lon=7.527866&format=json&nojsoncallback=1`)
    const data = res.data;
    const slice = data.photos.photo.slice(0, data.photos.perpage);
    const postData = slice.map(pd => <React.Fragment>
    </React.Fragment>)

    this.setState({
      pageCount: Math.ceil(data.photos.total / data.photos.perpage),
      pictures: data,
      loading: false,
      postData
    })
  }

  getPositions = async latlng => {
    this.setState({ loading: true });
    const res = await Axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e7afd2454d45bfd6f4c5b14bec289d53&page=1&lat=${this.state.lat}&lon=${this.state.lng}&format=json&nojsoncallback=1`);
    this.setState({ pictures: res.data, loading: false });
  }



  handlePageClick = (e) => {
    const selectedPage = e.selected;

    this.setState({
      currentPage: selectedPage + 1,
    }, () => {
      this.receivedData()
    });

  };

  onClick(t, map, coord) {

    var { latLng } = coord;
    var lats = latLng.lat();
    var lngs = latLng.lng();

    this.setState({
      lat: lats,
      lng: lngs
    }, () => {
      this.getPositions()
    });

  }


  render() {
    const { pictures, loading, currentPage } = this.state;

    return (
      <div className="App">

        <div className="container">
          <div className="row">
            <div className="col-12 mapdiv">
              <Maps
                getPositions={this.getPositions}
                onClick={this.onClick}
                lat={this.state.lat}
                lng={this.state.lng}
              />
            </div>
          </div>
          <div>
            {this.state.postData}
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              currentPage={currentPage}
              activeClassName={"active"} />
          </div>
          <div className="row">
            <div className="col-12">
              <div className="App-intro">
                <Flickrimg pictures={pictures} loading={loading} getPositions={this.getPositions} currentPage={currentPage} receivedData={this.receivedData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
