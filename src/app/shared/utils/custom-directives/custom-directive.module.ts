import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyNumberDirective } from './only-number.directive';
import { RestrictFirstSpaceDirective } from './restrict-first-space.directive';
import { TextTrimDirective } from './text-trim.directive';

const CUSTOM_DIRECTIVE = [
  OnlyNumberDirective,
  RestrictFirstSpaceDirective,
  TextTrimDirective,
]

@NgModule({
  declarations: [
    CUSTOM_DIRECTIVE
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CUSTOM_DIRECTIVE
  ]
})
export class CustomDirectiveModule { }
