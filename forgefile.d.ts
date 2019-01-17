/*
 * Copyright 2018 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 *
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 *
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */

declare module "spinal-lib-forgefile" {
  const {
    spinalCore,
    Model,
    Path,
    Choice
  } = require("spinal-core-connectorjs_type");

  interface ForgeFileDerivativesItemParams {
    [key: string]: any;
    name?: string;
    path?: string;
  }

  class ForgeFileDerivativesItem extends Model {
    name: spinal.Str;
    path: spinal.Str;
    constructor(params?: ForgeFileDerivativesItemParams);
  }

  class ForgeFileItem extends Model {
    _name: spinal.Str;
    _viewable: spinal.Bool;
    _children: spinal.Lst<ForgeFileDerivativesItem>;
    name: spinal.Str;
    filepath: spinal.Path;
    state: spinal.Choice;
    urn: spinal.Str;
    ask_token: spinal.Bool;
    oauth: spinal.Str;
    bucket_key: spinal.Str;
    constructor(name: string);
    add_child(child: ForgeFileDerivativesItem): void;
    accept_child(ch: any): boolean;
  }

  export = {
    default: ForgeFileItem,
    ForgeFileItem,
    ForgeFileDerivativesItem
  };
}
