import { Test, TestingModule } from '@nestjs/testing';
import { MawedyImagesService } from './mawedy-images.service';

describe('MawedyImagesService', () => {
  let service: MawedyImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MawedyImagesService],
    }).compile();

    service = module.get<MawedyImagesService>(MawedyImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
