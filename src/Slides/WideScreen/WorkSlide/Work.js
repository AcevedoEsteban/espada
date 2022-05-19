import React, { Component } from 'react';
import styled from 'styled-components';
import TextContent from './TextContent';
import ImageContent from './ImageContent';

const Container = styled.div`
    display: flex;
    flex-flow: row nowrap;
    /* border: 1px dashed red; */
`;

class Work extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vh: 0,
      slideNumber: 0,
    };
    this.pageSplitTimes = 1.4;
    this.lastScrollTop = 0;
    this.scrollDirectionDown = true;
    this.handleScroll = this.handleScroll.bind(this);
    this.workDetails = [

      {
        number: '',
        projectName: '',
        github: '',
        projectDesc: '',
        projectType: '',
        roles: [''],
        site: '',
      },
      {
        number: '01',
        projectName: 'YachtBay',
        github: 'https://github.com/AcevedoEsteban/eCommerce',
        projectDesc: 'eCommerce platform from the ground up with React, Redux, Express & MongoDB.',
        projectType: 'WEB APP',
        roles: ['Full Stack Developer'],
        site: 'https://yachtbay.herokuapp.com/',
      },
      {
        number: '02',
        projectName: 'DevConnector',
        github: 'https://www.youtube.com/watch?v=AILU8hl-dmo',
        projectDesc: 'iOS app to remember your fav food at each restaurant you eat.',
        projectType: 'iOS APP',
        roles: ['Full Stack Develeoper'],
        site: 'https://www.youtube.com/watch?v=AILU8hl-dmo',

      },
      {
        number: '03',
        projectName: 'ComingOrNot',
        github: 'https://www.youtube.com/watch?v=AILU8hl-dmo',
        projectDesc: 'Event planner web app that strives to ease the work of an organizer, conduct events in a less chaotic way.',
        projectType: 'WEB APP',
        roles: ['Front-end Developer', 'UI Designer'],
        site: 'https://www.youtube.com/watch?v=AILU8hl-dmo',
      },
      {
        number: '',
        projectName: '',
        github: '',
        projectDesc: '',
        projectType: '',
        roles: [''],
        site: '',
      },
    ];
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.setState(
      {
        vh: Math.round(
          window.document.documentElement.clientHeight * this.pageSplitTimes,
        ),
      },
    );
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    const { body, documentElement } = event.srcElement;
    const { vh, slideNumber } = this.state;
    const scrollDistance = Math.max(body.scrollTop, documentElement.scrollTop);
    if (scrollDistance > this.lastScrollTop) {
      this.scrollDirectionDown = true;
    } else {
      this.scrollDirectionDown = false;
    }
    this.lastScrollTop = scrollDistance;
    // console.log(scrollDistance);

    if (Math.floor(scrollDistance / vh) !== slideNumber
      && slideNumber < this.workDetails.length - 1) {
      this.setState({ slideNumber: Math.floor(scrollDistance / vh) });
    } else if (slideNumber === this.workDetails.length - 1
      && (Math.floor(scrollDistance / vh) < slideNumber)) {
      this.setState({ slideNumber: Math.floor(scrollDistance / vh) });
    }
  }

  changeTextContentBasedOnScroll() {
    const { slideNumber } = this.state;
    const refresh = true;
    return (
      <TextContent
        number={this.workDetails[slideNumber].number}
        projectName={this.workDetails[slideNumber].projectName}
        github={this.workDetails[slideNumber].github}
        projectDesc={this.workDetails[slideNumber].projectDesc}
        projectType={this.workDetails[slideNumber].projectType}
        roles={this.workDetails[slideNumber].roles}
        site={this.workDetails[slideNumber].site}
        refreshToggle={refresh}
      />
    );
  }

  render() {
    return (
      <Container>
        {this.changeTextContentBasedOnScroll()}
        <ImageContent pageSplitTimes={this.pageSplitTimes} />
      </Container>
    );
  }
}

export default Work;
