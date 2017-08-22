const getData = require('./queries/generic');

function test (query, cb) {
  // let obj = {};
  // const query = `SELECT teams.id AS team_id, teams.name AS team_name , teams.description AS team_description
  //                 , memebers.name AS member_name ,
  //                 projects.id AS project_id , projects.title AS project_name , projects.state AS project_state FROM teams_members
  //                 INNER JOIN memebers ON memebers.id = teams_members.member_id
  //                 INNER JOIN teams ON teams.id = teams_members.team_id
  //                 INNER JOIN projects ON projects.team_id = teams.id;`;
  // const query =
  getData(query, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
}

test('SELECT DISTINCT id , name , description FROM teams', (err, res) => {
  if (err) {
    console.log(err);
  } else {
    let ids = res.map((obj) => {
      return {id: obj.id, name: obj.name, description: obj.description};
    });
    ids.map((team) => {
      team.projects = [];
      team.members = [];
      test(`SELECT id , title , description , state FROM projects WHERE team_id=${team.id}`, (err, projectsRes) => {
        if (err) {
          console.log('in projects query', err);
        } else {
          team.projects = projectsRes;
          test(`SELECT member_id , memebers.name FROM teams_members INNER JOIN memebers ON memebers.id = teams_members.member_id WHERE team_id=${team.id}`, (err, membersRes) => {
            if (err) {
              console.log('member query error', err);
            } else {
              team.members = membersRes;
              console.log(team);
            }
          });
        }
      });
    });
  }
});
