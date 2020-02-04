// Add enzyme
// NOTE: Enzyme snapshot testing is not currently supported due
// to serialization conflicts with jest-emotion. Use enzyme
// for more robust shallow instance unit testing and
// react-test-renderer for emotion styled snapshots
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
