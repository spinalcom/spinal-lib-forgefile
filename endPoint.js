// Copyright 2015 SpinalCom  www.spinalcom.com

// This file is part of SpinalCore.

// SpinalCore is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Soda is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
// You should have received a copy of the GNU General Public License
// along with Soda. If not, see <http://www.gnu.org/licenses/>.


var exports = module.exports = {};


var endpoint_TimeSeries = class endpoint_TimeSeries extends Model {
  constructor(name = "end point time series") {
    super();
    this.add_attr({
      time: [], // timestamp list
      value: [] // value
    });
  }
};
exports.endpoint_TimeSeries = endpoint_TimeSeries;


var endPoint = class endPoint extends Model {
  constructor(name = "End point") {
    super();
    var timeserie = new endpoint_TimeSeries();
    this.add_attr({
      display: false,
      id: '',
      title: '',
      color: '',
      username: '',
      date: Date.now(),
      currentValue: 0,
      TimeSerie: new Ptr(timeserie),
      allObject: []
    });
  }
};
exports.endPoint = endPoint;