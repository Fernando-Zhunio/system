import { Component, OnInit } from "@angular/core";

import OrgChart from "@balkangraph/orgchart.js";
import { StandartSearchService } from "../../../services/standart-search.service";

@Component({
  selector: "app-organization-chart",
  templateUrl: "./organization-chart.component.html",
  styleUrls: ["./organization-chart.component.css"],
})
export class OrganizationChartSystemComponent implements OnInit {
  constructor(private s_standart:StandartSearchService) {}

  data = [
    {
      id: 7,
      name: "Pedro Villavicencio",
      title: "Marketing",
      img:
        "http://static.media-novicompu.com/novisys/photos/wgCJK6jOBHbwkru3QhYOcdb3yxsX9I1616188552.jpg",
      pid: 6,
    },
    {
      id: 5,
      name: "Edgar Novoa",
      title: "Presidencia",
      img:
        "http://static.media-novicompu.com/novisys/photos/TpQmI9sm1GGuy6ZZN1zirsvOhfLAt61616180444.jpg",
    },
    {
      id: 6,
      name: "Patricio Novoa",
      title: "Gerencia General",
      img:
        "http://static.media-novicompu.com/novisys/photos/5NQnKga86cZo1YNCl10uFh6T7fepWK1616188365.jpg",
      pid: 5,
    },
    {
      id: 3,
      name: "Gabriel Gonzalez",
      title: "Marketing",
      img:
        "http://static.media-novicompu.com/novisys/photos/rr722b5vVSvbbQl10YQERhXQec6YAC1616020440.png",
      pid: 7,
    },
  ];
  ngOnInit(): void {

    var chart = new OrgChart(document.getElementById("tree"), {
      nodeBinding: {
        field_0: "Nombre",
        field_1: "Cargo",
        img_0: "img",
      },
    });
    this.s_standart.show('admin/people/orgchart').subscribe(res=>{
      console.log(res);
      if(res && res.hasOwnProperty('success') && res.success)
      chart.load(res.data);
    })




    // chart.load([
    //   {
    //     id: 1,
    //     name: "Denny Curtis",
    //     title: "CEO",
    //     img: "https://cdn.balkan.app/shared/2.jpg",
    //   },
    //   {
    //     id: 2,
    //     pid: 1,
    //     name: "Ashley Barnett",
    //     title: "Sales Manager",
    //     img: "https://cdn.balkan.app/shared/3.jpg",
    //   },
    //   {
    //     id: 3,
    //     pid: 1,
    //     name: "Caden Ellison",
    //     title: "Dev Manager",
    //     img: "https://cdn.balkan.app/shared/4.jpg",
    //   },
    //   {
    //     id: 4,
    //     pid: 2,
    //     name: "Elliot Patel",
    //     title: "Sales",
    //     img: "https://cdn.balkan.app/shared/5.jpg",
    //   },
    //   {
    //     id: 5,
    //     pid: 2,
    //     name: "Lynn Hussain",
    //     title: "Sales",
    //     img: "https://cdn.balkan.app/shared/6.jpg",
    //   },
    //   {
    //     id: 6,
    //     pid: 3,
    //     name: "Tanner May",
    //     title: "Developer",
    //     img: "https://cdn.balkan.app/shared/7.jpg",
    //   },
    //   {
    //     id: 7,
    //     pid: 3,
    //     name: "Fran Parsons",
    //     title: "Developer",
    //     img: "https://cdn.balkan.app/shared/8.jpg",
    //   },
    // ]);
  }
  // ds = {
  //   id: '1',
  //   name: 'Lao Lao',
  //   title: 'general manager',
  //   children: [
  //     { id: '2', name: 'Bo Miao', title: 'department manager' },
  //     {
  //       id: '3',
  //       name: 'Su Miao',
  //       title: 'department manager',
  //       children: [
  //         { id: '4', name: 'Tie Hua', title: 'senior engineer' },
  //         {
  //           id: '5',
  //           name: 'Hei Hei',
  //           title: 'senior engineer',
  //           children: [
  //             { id: '6', name: 'Dan Zai', title: 'engineer' },
  //             { id: '7', name: 'Dan Dan', title: 'engineer' },
  //             { id: '8', name: 'Xiang Xiang', title: 'engineer' },
  //             { id: '9', name: 'Ke Xin', title: 'engineer' },
  //             { id: '10', name: 'Xiao Dan', title: 'engineer' },
  //             { id: '11', name: 'Dan Dan Zai', title: 'engineer' }
  //           ]
  //         },
  //         { id: '12', name: 'Pang Pang', title: 'senior engineer' },
  //         { id: '13', name: 'Er Pang', title: 'senior engineer' },
  //         { id: '14', name: 'San Pang', title: 'senior engineer' },
  //         { id: '15', name: 'Si Pang', title: 'senior engineer' }
  //       ]
  //     },
  //     { id: '16', name: 'Hong Miao', title: 'department manager' },
  //     { id: '17', name: 'Chun Miao', title: 'department manager' },
  //     { id: '18', name: 'Yu Li', title: 'department manager' },
  //     { id: '19', name: 'Yu Jie', title: 'department manager' },
  //     { id: '20', name: 'Yu Wei', title: 'department manager' },
  //     { id: '21', name: 'Yu Tie', title: 'department manager' }
  //   ]
  // };

  // nodeHeadingProperty = "name";
  // nodeContentProperty = "title";

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
