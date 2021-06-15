import React from 'react';
import { Story, Meta } from '@storybook/react';
import {StarIcon} from './StarIcon'

export default {
    title : "CommonComponent/Icon/StarIcons",
    component : StarIcon
}

export const StarIcon1 = () =>  <StarIcon point ={5}></StarIcon>
