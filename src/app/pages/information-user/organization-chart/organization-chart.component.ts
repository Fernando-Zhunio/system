import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organization-chart',
  templateUrl: './organization-chart.component.html',
  styleUrls: ['./organization-chart.component.css']
})
export class OrganizationChartSystemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  ds = {
    id: '1',
    name: 'Lao Lao',
    title: 'general manager',
    children: [
      { id: '2', name: 'Bo Miao', title: 'department manager' },
      {
        id: '3',
        name: 'Su Miao',
        title: 'department manager',
        children: [
          { id: '4', name: 'Tie Hua', title: 'senior engineer' },
          {
            id: '5',
            name: 'Hei Hei',
            title: 'senior engineer',
            children: [
              { id: '6', name: 'Dan Zai', title: 'engineer' },
              { id: '7', name: 'Dan Dan', title: 'engineer' },
              { id: '8', name: 'Xiang Xiang', title: 'engineer' },
              { id: '9', name: 'Ke Xin', title: 'engineer' },
              { id: '10', name: 'Xiao Dan', title: 'engineer' },
              { id: '11', name: 'Dan Dan Zai', title: 'engineer' }
            ]
          },
          { id: '12', name: 'Pang Pang', title: 'senior engineer' },
          { id: '13', name: 'Er Pang', title: 'senior engineer' },
          { id: '14', name: 'San Pang', title: 'senior engineer' },
          { id: '15', name: 'Si Pang', title: 'senior engineer' }
        ]
      },
      { id: '16', name: 'Hong Miao', title: 'department manager' },
      { id: '17', name: 'Chun Miao', title: 'department manager' },
      { id: '18', name: 'Yu Li', title: 'department manager' },
      { id: '19', name: 'Yu Jie', title: 'department manager' },
      { id: '20', name: 'Yu Wei', title: 'department manager' },
      { id: '21', name: 'Yu Tie', title: 'department manager' }
    ]
  };

  nodeHeadingProperty = "name";
  nodeContentProperty = "title";

  // nodes: any = [
  //   {
  //     name: 'Sundar Pichai',
  //     cssClass: 'ngx-org-ceo',
  //     image: '',
  //     title: 'Chief Executive Officer',
  //     childs: [
  //       {
  //         name: 'Thomas Kurian',
  //         cssClass: 'ngx-org-ceo',
  //         image: 'assets/node.svg',
  //         title: 'CEO, Google Cloud',
  //       },
  //       {
  //         name: 'Susan Wojcicki',
  //         cssClass: 'ngx-org-ceo',
  //         image: 'assets/node.svg',
  //         title: 'CEO, YouTube',
  //         childs: [
  //           {
  //             name: 'Beau Avril',
  //             cssClass: 'ngx-org-head',
  //             image: 'assets/node.svg',
  //             title: 'Global Head of Business Operations',
  //             childs: []
  //           },
  //           {
  //             name: 'Tara Walpert Levy',
  //             cssClass: 'ngx-org-vp',
  //             image: 'assets/node.svg',
  //             title: 'VP, Agency and Brand Solutions',
  //             childs: []
  //           },
  //           {
  //             name: 'Ariel Bardin',
  //             cssClass: 'ngx-org-vp',
  //             image: 'assets/node.svg',
  //             title: 'VP, Product Management',
  //             childs: []
  //           }
  //         ]
  //       },
  //       {
  //         name: 'Jeff Dean',
  //         cssClass: 'ngx-org-head',
  //         image: 'assets/node.svg',
  //         title: 'Head of Artificial Intelligence',
  //         childs: [
  //           {
  //             name: 'David Feinberg',
  //             cssClass: 'ngx-org-ceo',
  //             image: 'assets/node.svg',
  //             title: 'CEO, Google Health',
  //             childs: []
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     name: 'Sundar Pichai',
  //     cssClass: 'ngx-org-ceo',
  //     image: 'assets/node.svg',
  //     title: 'Chief Executive Officer',
  //     childs: [
  //       {
  //         name: 'Thomas Kurian',
  //         cssClass: 'ngx-org-ceo',
  //         image: 'assets/node.svg',
  //         title: 'CEO, Google Cloud',
  //       },
  //       {
  //         name: 'Susan Wojcicki',
  //         cssClass: 'ngx-org-ceo',
  //         image: 'assets/node.svg',
  //         title: 'CEO, YouTube',
  //         childs: [
  //           {
  //             name: 'Beau Avril',
  //             cssClass: 'ngx-org-head',
  //             image: 'assets/node.svg',
  //             title: 'Global Head of Business Operations',
  //             childs: []
  //           },
  //           {
  //             name: 'Tara Walpert Levy',
  //             cssClass: 'ngx-org-vp',
  //             image: 'assets/node.svg',
  //             title: 'VP, Agency and Brand Solutions',
  //             childs: []
  //           },
  //           {
  //             name: 'Ariel Bardin',
  //             cssClass: 'ngx-org-vp',
  //             image: 'assets/node.svg',
  //             title: 'VP, Product Management',
  //             childs: []
  //           }
  //         ]
  //       },
  //       {
  //         name: 'Jeff Dean',
  //         cssClass: 'ngx-org-head',
  //         image: 'assets/node.svg',
  //         title: 'Head of Artificial Intelligence',
  //         childs: [
  //           {
  //             name: 'David Feinberg',
  //             cssClass: 'ngx-org-ceo',
  //             image: 'assets/node.svg',
  //             title: 'CEO, Google Health',
  //             childs: []
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     name: 'Sundar Pichai',
  //     cssClass: 'ngx-org-ceo',
  //     image: 'assets/node.svg',
  //     title: 'Chief Executive Officer',
  //     childs: [
  //       {
  //         name: 'Thomas Kurian',
  //         cssClass: 'ngx-org-ceo',
  //         image: 'assets/node.svg',
  //         title: 'CEO, Google Cloud',
  //       },
  //       {
  //         name: 'Susan Wojcicki',
  //         cssClass: 'ngx-org-ceo',
  //         image: 'assets/node.svg',
  //         title: 'CEO, YouTube',
  //         childs: [
  //           {
  //             name: 'Beau Avril',
  //             cssClass: 'ngx-org-head',
  //             image: 'assets/node.svg',
  //             title: 'Global Head of Business Operations',
  //             childs: []
  //           },
  //           {
  //             name: 'Tara Walpert Levy',
  //             cssClass: 'ngx-org-vp',
  //             image: 'assets/node.svg',
  //             title: 'VP, Agency and Brand Solutions',
  //             childs: []
  //           },
  //           {
  //             name: 'Ariel Bardin',
  //             cssClass: 'ngx-org-vp',
  //             image: 'assets/node.svg',
  //             title: 'VP, Product Management',
  //             childs: []
  //           }
  //         ]
  //       },
  //       {
  //         name: 'Jeff Dean',
  //         cssClass: 'ngx-org-head',
  //         image: 'assets/node.svg',
  //         title: 'Head of Artificial Intelligence',
  //         childs: [
  //           {
  //             name: 'David Feinberg',
  //             cssClass: 'ngx-org-ceo',
  //             image: 'assets/node.svg',
  //             title: 'CEO, Google Health',
  //             childs: []
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ];

}
