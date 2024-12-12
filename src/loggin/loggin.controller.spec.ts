import { Test, TestingModule } from '@nestjs/testing';
import { LogginController } from './loggin.controller';

describe('LogginController', () => {
  let controller: LogginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogginController],
    }).compile();

    controller = module.get<LogginController>(LogginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
