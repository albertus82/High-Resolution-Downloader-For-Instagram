import React, {Component} from 'react';
import {connect} from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setDownloadImage();
  }

  pickSourceFromSrcset(srcset, filterByConstraint) {
    return srcset.map((sourceAndConstraint) => {
      const [source, constraint] = sourceAndConstraint.split(' ');

      if (constraint === filterByConstraint) return source;
    }).join('').trim();
  }

  findImage() {
    const imageTag = Array.from(document.querySelectorAll('img')).find((image) => image.naturalWidth > 200);
    const srcset = imageTag.srcset.split(',');

    return this.pickSourceFromSrcset(srcset, '1080w');
  }

  setDownloadImage() {
    const imageUrl = findImage();
    this.downloadButton.href = imageUrl;
  }

  render() {
    const buttonStyle = {
      position: 'fixed',
      bottom: '10vh',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: '9999'
    }

    return (
      <a
        ref={(downloadButton) => { this.downloadButton = downloadButton; }}
        style={buttonStyle}
        href=""
        download=""
      >
        Download High Resolution Copy
      </a>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count
  };
};

export default connect(mapStateToProps)(App);
