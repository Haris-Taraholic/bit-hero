import React from "react";

import { Hero } from "../Hero/Hero";
import { TeamMember } from "../TeamMember/TeamMember";
import { heroService } from "../../../Services/HeroService";

import style from "./ListofHeroes.module.css";
import { storage } from "../../../shared/storage";

class ListofHeroes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heroes: [],
      serchedHero: null,
      teamMembers: storage.get('myTeam') || [],
    };
  }

  componentDidMount() {
    heroService
      .fetchAll()
      .then((data) => this.setState({ heroes: data.data.results }));
  }

  getSearchedHero = (event) => {
    if (event.target.value) {
      heroService
        .search(event.target.value)
        .then((res) =>
          res.data.results.length !== 0
            ? this.setState({ heroes: res.data.results })
            : null
        );
    }
    if (event.target.value === "") {
      // this.setState({ serchedHero: null });
      heroService
        .fetchAll()
        .then((data) => this.setState({ heroes: data.data.results }));
    }
  };

  addMember = (id) => {
    const inTeam = !!this.state.teamMembers.find(hero => hero.id === id);

    if (inTeam) return;

    const newTeamMember = this.state.heroes.find(hero => hero.id === id);
    const extendedTeam = [...this.state.teamMembers, newTeamMember];
    this.setState({ teamMembers: extendedTeam })

    storage.set('myTeam', extendedTeam)
  }

  removeMember = (id, key) => {

    const teamMembers = this.state.teamMembers.filter(member => member.id !== id);
    this.setState({ teamMembers });
    storage.set('myTeam', teamMembers);

  }

  render() {
    return (
      <div className="Container" >
        <div>
          <input
            type="search"
            placeholder="Enter heroes name...."
            onChange={this.getSearchedHero}
            className={style.searchField}
          />
          <div className={style.wrapper}>
            {this.state.heroes.map((item, i) => (
              <Hero
                key={i}
                name={item.name}
                image={item.thumbnail.path + "." + item.thumbnail.extension}
                id={item.id}
                addMember={this.addMember}
              />
            ))}
          </div>
        </div>
        <div className={style.team}>
          <h1>My Team</h1>
          {this.state.teamMembers.map((member, i) => <TeamMember key={i} removeMember={this.removeMember} data-id={member.id} url={`${member.thumbnail.path}.${member.thumbnail.extension}`} name={member.name}></TeamMember>)}
        </div>
      </div>
    );
  }
}
export { ListofHeroes };
