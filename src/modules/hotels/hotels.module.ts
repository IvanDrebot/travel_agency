import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule as Common } from 'src/modules/common/common.module';

import { HotelItemComponent } from 'src/components/hotels/hotel-item/hotel-item.component';
import { CreatingHotelComponent } from 'src/components/hotels/creating/creating.component';
import { NewHotelFormComponent } from 'src/components/hotels/creating/new-form/new-form.component';
import { HotelsComponent } from 'src/pages/hotels/hotels.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadHotelImgComponent } from 'src/components/hotels/creating/upload-img/upload-img.component';
import { HotelComponent } from 'src/pages/hotel/hotel.component';
import { ToursService } from 'src/services/tours.service';

const routes: Routes = [
  {
    path: '',
    component: HotelsComponent,
  },
  {
    path: 'creating',
    component: CreatingHotelComponent,
  },
];

@NgModule({
  declarations: [
    HotelsComponent,
    HotelItemComponent,
    CreatingHotelComponent,
    HotelComponent,
    NewHotelFormComponent,
    UploadHotelImgComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Common,
    ReactiveFormsModule,
  ],
  providers: [ToursService],
})
export class HotelsModule {}