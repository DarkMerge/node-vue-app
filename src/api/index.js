import axios from 'axios';
import _ from 'lodash';
import store from '../store'

let formattedData = {}

export default {
  getStats: () => {
    axios.get('/data')
      .then((response) => {
        formattedData = {}
        setDepth(response.data, 0)
        store.commit('updateStats', formattedData)
      })
  },
  getLocalStats: () => {
    axios.get('/local-stats')
      .then((response) => {
        console.log('response ', response);
        // store.commit('updateLocalStats', formattedData)
      })
  }
}

const parseConfig = [
  {
    name: 'motherboardStats',
    data: {}
  },
  {
    name: 'cpuStats',
    data: []
  },
  {
    name: 'memoryStats',
    data: []
  },
  {
    name: 'gpuStats',
    data: []
  },
  {
    name: 'hddStats',
    data: []
  }
]

function setDepth(data, depth, key) {
  key = key || ''

  if (!data || depth > 1) {
    return formattedData
  }

  data.depth = depth;

  if (depth === 1) {
    formattedData.farmName = data.Text;
    // console.log(_.at(data, 'Children[0]'));

    parseConfig.forEach((elem, index) => {
      if (index >= 0 && data.Children[index]) {
        createCategory(data.Children[index], elem.name)
        data.Children[index] = null
      }
    })

  } else if (data.Children) {

    if (_.isArray(data.Children) && data.Children.length === 1) {
      depth++
      data.Children = data.Children[0]
      setDepth(data.Children, depth)
    } else if (_.isArray(data.Children) && data.Children.length > 1) {
      depth++
      data.Children.forEach((elem) => {
        setDepth(elem, depth)
      });
    } else {
      depth++
      setDepth(data.Children, depth)
    }
  } else {
    return formattedData;
  }
  //  else if (depth === 2) {
  //   formattedData['test-' + depth] = copyMainFields(data)
  // } else if (depth > 2) {
  //   formattedData['test-' + depth] = copyMainFields(data)
  // }


}

function createCategory(child, title) {
  formattedData[title] = copyMainFields(child)
  delete child.Children
}

function copyMainFields(obj) {
  return {
    id: obj.id,
    depth: obj.depth,
    Text: obj.Text,
    Value: obj.Value,
    Min: obj.Min,
    Max: obj.Max,
    ImageURL: obj.ImageURL,
    Children: obj.Children
  }
}

function parseStats(data) {
  let parsedJson = {
    title: 'Its working!'
  };
  let depth = 0;
  let currentRoot = {};

  if (depth === 0) {
    parsedJson['vlv'+depth] = {
      depth: depth,
      Children: extendJson(data.Children)
    };
    depth++;
    return parsedJson;
  } else if (depth === 1) {

  }

  for (let key in data) {
    let prop = data[key];
    // main code start

    // console.log('data[key]: ', data[key]);
    if (data[key].id == 1) {
      parsedJson.farmName = data[key].Text;
    }

    const IS_OBJECT = _.isObject(data[key]);


    if (IS_OBJECT) {
      counter++;
      // console.log('------------------IS_OBJECT----------------');
      // console.log(data[key]);
      parseStats(data[key]);
    }

    // main code end
  }

  return parsedJson;
}

function extendJson(obj, depth) {
  console.log('obj ', obj);
  return obj;
}