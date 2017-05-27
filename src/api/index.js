import axios from 'axios';
import _ from 'lodash';
import store from '../store'

let formattedData = {}

export default {
  getStats: () => {
    axios.get('/data')
      .then((response) => {
        formattedData = {}
        setDepth(JSON.parse(response.data), 0)
        store.commit('updateStats', formattedData)
      })
  },
  getLocalStats: () => {
    axios.get('/local-stats')
      .then((response) => {
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

    parseConfig.forEach((elem, index) => {
      if (index >= 0 && data.Children[index]) {
        createCategory(data.Children[index], elem.name)
        data.Children[index] = null
      }
    })

  } else if (data.Children) {

    if (_.isArray(data.Children) && data.Children.length === 1) {
      depth++
      setDepth(data.Children[0], depth)
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
      Children: data.Children
    };
    depth++;
    return parsedJson;
  } else if (depth === 1) {

  }

  for (let key in data) {
    let prop = data[key];
    // main code start

    if (data[key].id == 1) {
      parsedJson.farmName = data[key].Text;
    }

    const IS_OBJECT = _.isObject(data[key]);


    if (IS_OBJECT) {
      counter++;
      parseStats(data[key]);
    }

    // main code end
  }

  return parsedJson;
}
